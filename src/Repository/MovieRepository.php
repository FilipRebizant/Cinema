<?php

namespace App\Repository;

use App\Entity\Movie;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Movie|null find($id, $lockMode = null, $lockVersion = null)
 * @method Movie|null findOneBy(array $criteria, array $orderBy = null)
 * @method Movie[]    findAll()
 * @method Movie[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MovieRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Movie::class);
    }
    
    public function getQuery()
    {
//        echo '<pre>';
//        die;
//        print_R($this->getEntityManager()->getConnection());
//        die;
        $ex = $this->getEntityManager()->createQuery('Select * from customers');
        echo '<pre>';
        print_r($ex);
        die;
        
        return 
        die('quert');
    }
    
//    /**
//     * @return Movie[] Returns an array of Movie objects
//     */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('m.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Movie
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
    public function getSchedule()
    {
        return $this->createQueryBuilder('m')
            ->addSelect('DATE_FORMAT(s.start_date, \'%Y-%m-%d\') as day')
            ->innerJoin('m.screenings', 's')
            ->addGroupBy('day')
            ->groupBy('m.title')
            ->getQuery()
            ->getResult();
    }

}

<?php

namespace App\Repository;

use App\Entity\Screening;
use App\Entity\Movie;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\Query\ResultSetMapping;
use Symfony\Bridge\Doctrine\RegistryInterface;
use Symfony\Component\Intl\DateFormatter\DateFormat;

/**
 * @method Screening|null find($id, $lockMode = null, $lockVersion = null)
 * @method Screening|null findOneBy(array $criteria, array $orderBy = null)
 * @method Screening[]    findAll()
 * @method Screening[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ScreeningRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Screening::class);
    }

//    /**
//     * @return Screening[] Returns an array of Screening objects
//     */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('s.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Screening
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */

    public function getScreeningSchedule()
    {
        //Działa ale zwraca tylko 1 rekord
        $date = date('Y-m-d h:i:s', strtotime("+7 days"));
         return $this->createQueryBuilder('s')
            ->select('s')
            ->addSelect('DATE_FORMAT(s.start_date, \'%Y-%m-%d\') as day')
            ->where('s.start_date BETWEEN :today AND :n30days')
            ->setParameter('today', date('Y-m-d h:i:s'))
            ->setParameter('n30days', $date)
            ->orderBy('s.start_date')
            ->getQuery()
            ->getResult();
    }

}

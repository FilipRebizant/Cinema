<?php

namespace App\Repository;

use App\Entity\FOSUser;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method FOSUser|null find($id, $lockMode = null, $lockVersion = null)
 * @method FOSUser|null findOneBy(array $criteria, array $orderBy = null)
 * @method FOSUser[]    findAll()
 * @method FOSUser[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class FOSUserRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, FOSUser::class);
    }

//    /**
//     * @return FOSUser[] Returns an array of Ticket objects
//     */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('t.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Ticket
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
